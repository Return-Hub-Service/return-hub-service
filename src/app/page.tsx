"use client";

import { HomeProps } from "../interfaces/home/Home";
import countHomeProps from "../utils/countHomeProps";

export default function Home({
  property_a,
  property_b,
  property_c,
}: HomeProps) {
  const count = countHomeProps({ property_a, property_b, property_c });
  return <p>{`The number of props received was ${count}`}</p>;
}
