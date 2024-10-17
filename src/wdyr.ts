import React from "react";
import whyDidYouRender from "@welldone-software/why-did-you-render";

if (import.meta.env.MODE === "development") {
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  });
}
