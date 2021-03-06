import { json, LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { rootUidRoute } from "~/utils/prismic";
import { SliceLike, SliceZone } from "@prismicio/react";
import HeroSlice from "../../slices/HeroSlice";
import { SliceTypes, SliceZoneContext } from "~/types/prismic";
import { getPrismicDocumentFromCache } from "~/utils/prismic.server";

type LoaderData = { slices: SliceLike[] };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.uid, "Expected params.uid");
  const uid = params.uid;

  try {
    const doc = await getPrismicDocumentFromCache("page", uid, {
      routes: [rootUidRoute],
    });
    const data: LoaderData = { slices: doc.data.slices };
    return json(data);
  } catch (error) {
    throw new Response("Not found.", {
      status: 404,
    });
  }
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <SliceZone<SliceTypes, SliceZoneContext>
        slices={data.slices}
        components={{
          hero_slice: HeroSlice,
        }}
      />
    </div>
  );
}
