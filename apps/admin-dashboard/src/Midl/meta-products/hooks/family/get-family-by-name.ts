import { where } from "firebase/firestore";
import React from "react";
import { ApplicationError, TApplicationErrorObject } from "rxf-rewrite";
import ApplicationErrorHandler from "rxf-rewrite/dist/errors/error-handler";
import { from } from "rxjs";

import { TMetaProductFamily } from "../../types";
import { metaProductFamilyRepo } from "./helpers-family";

async function familyByNameAsyncWrapper(name: string) {
  const res = await metaProductFamilyRepo.getAll([where("name", "==", name)]);
  if (res instanceof ApplicationErrorHandler) return res;
  else {
    if (res.length === 1) return res[0];
    else return new ApplicationError().handleDocumentNotFound();
  }
}

export default function useGetFamilyByName(mounted: boolean) {
  const [loadingFlag, setLoadingFlag] = React.useState(false);
  const [family, setFamily] = React.useState<null | TMetaProductFamily>(null);
  const [familyError, setFamilyError] =
    React.useState<null | TApplicationErrorObject>(null);

  function getFamilyByName(name: string) {
    setLoadingFlag(true);
    const obs$ = from(familyByNameAsyncWrapper(name));
    const sub = obs$.subscribe((res) => {
      if (res instanceof ApplicationErrorHandler) setFamilyError(res.errorObject);
      else {
        setFamily(res);
        setFamilyError(null);
      }
      setLoadingFlag(false);
    });
    if (!mounted) sub.unsubscribe();
  }

  return { loadingFlag, getFamilyByName, family, familyError };
}
