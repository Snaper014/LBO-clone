import { SectionCategorie } from "../Components/SectionCategorie";
import { Page } from "../pages/Page";

export const Error = () => {
  return (
    <Page>
      <h1 className="mt-5 mb-2 font-bold text-[40px] max-lg:text-[20px]">
        Page Introuvable
      </h1>
      <p className="text-center font-bold max-lg:text-[12px] max-lg:font-normal">
        Impossible de trouver la page recherchée.
      </p>
      <p className="font-bold text-center max-lg:px-3 max-lg:text-[12px] max-lg:font-normal mb-8">
        Nous vous préparons des offres que vous ne pourrez pas refuser !
      </p>
      <p className="mt-5 mb-2 uppercase min-[520px]:tracking-[2.6rem] max-[260px]:tracking-[0.5rem] min-[525px]:tracking-[1rem] max-[520px]:text-[0.80rem] text-[1.3rem] text-[#0E14D3]">
        sélection
      </p>
      <p className="mb-5 max-[520px]:text-[1.5rem] text-black text-[4.5rem] font-semibold">
        Top Catégories
      </p>
      <SectionCategorie />
      {/* section top ventes avec data*/}
    </Page>
  );
};
