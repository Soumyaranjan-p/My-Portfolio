import Container from "@/app/components/common/Container";
import Mycomponents from "@/app/components/landing/Components";
import { generateMetadata as getMetadata } from "@/app/config/Meta";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...getMetadata("/blocks"),
};

export default function Blocks() {
  return <h1 className="text-5xl t">
<Mycomponents />

  </h1>;
}
