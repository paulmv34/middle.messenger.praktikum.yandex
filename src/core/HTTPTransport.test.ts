import sinon, { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from "sinon";
import { expect } from "chai";
import { HTTPTransport } from "./HTTPTransport";
import constants from "../constants";

describe("HTTPTransport test", () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];
    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        // @ts-expect-error: Required for test
        global.XMLHttpRequest = xhr;

        xhr.onCreate = (req) => {
            requests.push(req);
        };

        instance = new HTTPTransport("");
    });

    afterEach(() => {
        requests.length = 0;
        xhr.restore();
    });

    it("Method get() should be called with GET method", () => {
        instance.get("/");

        const [request] = requests;

        expect(request.method).to.equal("GET");
    });

    it("Method post() should be called with POST method", () => {
        instance.post("/");

        const [request] = requests;

        expect(request.method).to.equal("POST");
    });

    it("Method put() should be called with PUT method", () => {
        instance.put("/");

        const [request] = requests;

        expect(request.method).to.equal("PUT");
    });

    it("Method get() should be called with DELETE method", () => {
        instance.delete("/");

        const [request] = requests;

        expect(request.method).to.equal("DELETE");
    });

    it("Header option adds headers to the request", () => {
        const headers = {
            "Content-Type": "application/json;charset=utf-8",
        };

        instance.get("/", { headers });

        const [request] = requests;

        expect(request.requestHeaders["Content-Type"]).to.equal("application/json;charset=utf-8");
    });

    it("Method get() inserts parameters to url", () => {
        const data = {
            param1: "value1",
            param2: "value2",
            param3: 3,
        };

        instance.get("/", { data });

        const [request] = requests;
        const expectedUrl = `${constants.HOST}/?param1=value1&param2=value2&param3=3`;

        expect(request.url).to.equal(expectedUrl);
    });
});
