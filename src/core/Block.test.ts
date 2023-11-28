import {expect} from "chai";
import Block from "./Block";
import {Props, RefType} from "../types/types";
import {registerComponent} from "./registerComponent";

interface IProps extends Props {
    text?: string;
    events?: { click?: () => void; };
    children?: TestBlock;
}

interface IRefs extends RefType {
    childBlock: TestChildBlock;
}

class TestBlock extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile("<div id=\"test-block\">{{text}}</div>", this.props);
    }
}

class TestParentBlock extends Block<IProps, IRefs> {
    protected render(): DocumentFragment {
        return this.compile("<div id=\"test-parent\">{{{TestChildBlock text=text ref=\"childBlock\"}}}</div>", this.props);
    }
}

class TestChildBlock extends Block<IProps> {
    protected render(): DocumentFragment {
        return this.compile("<div id=\"test-child\">{{text}}</div>", this.props);
    }
}


registerComponent("TestParentBlock", TestParentBlock as typeof Block<Props, RefType>);
registerComponent("TestChildBlock", TestChildBlock as typeof Block<Props, RefType>);

describe("Block", () => {
    it("The component created.", () => {
        const block = new TestBlock({ text: "Block created" });
        expect(block.getElement()!.outerHTML).equal("<div id=\"test-block\">Block created</div>");
    });

    it("The component was updated when the properties were updated.", () => {
        const block = new TestBlock({ text: "Block created" });
        block.setProps({ text: "Block updated" });

        expect(block.getElement()!.outerHTML).equal("<div id=\"test-block\">Block updated</div>");
    });

    it("Event added by props.", () => {
        const block = new TestBlock({
            text: "text",
            events: {
                click: () => {},
            }
        });

        // @ts-expect-error: Using protected method or props
        expect(!!block.props.events?.click).to.be.true;
    });

    it("Refs processed and available.", () => {
        const block = new TestParentBlock({
            text: "text",
        });

        // @ts-expect-error: Using protected method or props
        expect(!!block.refs.childBlock).to.be.true;
    });

    it("Refs get props from parent Block.", () => {
        const block = new TestParentBlock({
            text: "text",
        });

        // @ts-expect-error: Using protected method or props
        expect(block.refs.childBlock.props.text).to.equal("text");
    });

    it("Refs props was updated when the properties were updated.", () => {
        const block = new TestParentBlock({
            text: "First value",
        });

        block.setProps({text: "Second value"});

        // @ts-expect-error: Using protected method or props
        expect(block.refs.childBlock.getElement()!.innerHTML).equal("Second value");
    });

    it("Children placed.", () => {
        const block = new TestParentBlock({
            text: "Parent",
            child: new TestChildBlock({
                text: "Children",
            }),
        });

        // @ts-expect-error: Using protected method or props
        expect(block.children.child.getElement()!.innerHTML).equal("Children");
    });

    it("Props updated and children still placed.", () => {
        const block = new TestParentBlock({
            text: "Parent",
            child: new TestChildBlock({
                text: "Children",
            }),
        });

        block.setProps({text: "Second value"});

        // @ts-expect-error: Using protected method or props
        expect(block.children.child.getElement()!.innerHTML).equal("Children");
    });
});
