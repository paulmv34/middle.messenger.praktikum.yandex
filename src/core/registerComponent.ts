import Handlebars from "handlebars";
import Block from "./Block";
import { ComponentHelperOptions } from "../types/main.types";

export function registerComponent(name: string, Component: typeof Block) {
    if (name in Handlebars.helpers) {
        throw `The ${name} component is already registered!`;
    }

    Handlebars.registerHelper(name, function (this: unknown, {hash, data, fn}: ComponentHelperOptions) {
        const component = new Component(hash);
        const dataAttribute = `data-id="${component.id}"`;
        
        if ("ref" in hash) {
            (data.root.__refs = data.root.__refs || {})[hash.ref] = component;
        }

        (data.root.__children = data.root.__children || []).push({
            component,
            embed(fragment: DocumentFragment) {
                const stub = fragment.querySelector(`[${dataAttribute}]`);

                if (!stub) {
                    return;
                }

                component.getContent()?.after(...Array.from(stub.childNodes));

                stub.replaceWith(component.getElement()!);
            }
        });

        const contents = fn ? fn(this) : "";

        return `<div ${dataAttribute}>${contents}</div>`;
    });
}
