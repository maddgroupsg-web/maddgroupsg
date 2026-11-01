import Shell from "@/components/Shell";
import { Button, Words } from "@/components/ui";
export default function NotFound() {
  return <Shell><section className="pt-40 pb-32 text-center"><div className="container-x"><div className="eyebrow">404</div><h1 className="display text-6xl mt-3"><Words>THIS STAGE IS EMPTY.</Words></h1><p className="mt-4 text-mute">The page you're looking for has moved. Let's get you back to the show.</p><div className="mt-8 flex justify-center gap-3"><Button href="/">HOME</Button><Button href="/classes" variant="outline">PROGRAMMES</Button></div></div></section></Shell>;
}
