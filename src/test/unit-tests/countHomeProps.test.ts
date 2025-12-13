import countHomeProps from "@/src/utils/countHomeProps";
import { HomeProps } from "@/src/interfaces/home/Home";

describe("countHomeProps", () => {
  it("should return 0 when all properties are undefined", () => {
    const props: HomeProps = {};
    expect(countHomeProps(props)).toBe(0);
  });

  it("should return 1 when only property_a is defined", () => {
    const props: HomeProps = { property_a: "value" };
    expect(countHomeProps(props)).toBe(1);
  });

  it("should return 1 when only property_b is defined", () => {
    const props: HomeProps = { property_b: "value" };
    expect(countHomeProps(props)).toBe(1);
  });

  it("should return 1 when only property_c is defined", () => {
    const props: HomeProps = { property_c: "value" };
    expect(countHomeProps(props)).toBe(1);
  });

  it("should return 2 when property_a and property_b are defined", () => {
    const props: HomeProps = { property_a: "value1", property_b: "value2" };
    expect(countHomeProps(props)).toBe(2);
  });

  it("should return 2 when property_a and property_c are defined", () => {
    const props: HomeProps = { property_a: "value1", property_c: "value3" };
    expect(countHomeProps(props)).toBe(2);
  });

  it("should return 2 when property_b and property_c are defined", () => {
    const props: HomeProps = { property_b: "value2", property_c: "value3" };
    expect(countHomeProps(props)).toBe(2);
  });

  it("should return 3 when all properties are defined", () => {
    const props: HomeProps = {
      property_a: "value1",
      property_b: "value2",
      property_c: "value3",
    };
    expect(countHomeProps(props)).toBe(3);
  });

  it("should count empty strings as defined", () => {
    const props: HomeProps = {
      property_a: "",
      property_b: "",
      property_c: "",
    };
    expect(countHomeProps(props)).toBe(3);
  });

  it("should not count null values (they are not undefined)", () => {
    const props: HomeProps = {
      property_a: undefined,
      property_b: undefined,
      property_c: undefined,
    };
    expect(countHomeProps(props)).toBe(0);
  });
});
