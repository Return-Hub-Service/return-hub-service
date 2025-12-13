import { HomeProps } from "../interfaces/home/Home";

function countHomeProps({ property_a, property_b, property_c }: HomeProps) {
  let count = 0;
  if (property_a !== undefined) count++;
  if (property_b !== undefined) count++;
  if (property_c !== undefined) count++;
  return count;
}

export default countHomeProps;
