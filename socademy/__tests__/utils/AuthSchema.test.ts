import { loginSchema, PASSWORD_MIN, registerSchema } from "../../src/utils/AuthSchema";


describe("loginSchema", () => {

    it("godtar gyldig e-post og passord", () => {
        const result = loginSchema.safeParse({ email: "tina@hiof.no", password: "hemmelig" });
        expect(result.success).toBe(true);
    });

    it("avviser tom e-post", () => {
        const result = loginSchema.safeParse({ email: "", password: "yoyogængster" });
        expect(result.success).toBe(false);
    });
});

describe("registerSchema", () => {
    
    const valid = { 
        name: "tina", 
        email: "tina@hiof.no", 
        password: "hemmelig" 
    }

    it("godtar en @hiof.no-adresse", () => {
        const result = registerSchema.safeParse(valid);
        expect(result.success).toBe(true);
    });

    it("avviser e-post som ikke er @hiof.no", () => {
        const result = registerSchema.safeParse({ ...valid, email: "tina@gmail.com" });
        expect(result.success).toBe(false);
    });

    it("godtar store bokstaver i e-posten", () => {
        const result = registerSchema.safeParse({ ...valid, email: "STOR@HIOF.NO"});
        expect(result.success).toBe(true);
    });

    it(`krever minst ${PASSWORD_MIN} tegn i passordet`, () => {
        const result = registerSchema.safeParse({ ...valid, password: "123"});
        expect(result.success).toBe(false);
    });
});
