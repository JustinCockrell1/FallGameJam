import { test, expect } from '@jest/globals';


import Foo from "../Modules/Foo";

test("foo works", ()=>{
    const f = new Foo();
    expect(f.getVal()).toEqual("a");
});
