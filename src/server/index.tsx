import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "../client";
import axios from "axios";
import { ElementType, RootType } from "../../types/JsonDesign.types";

const app = express();
const port = 3000;

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use(express.static("dist/public"));

app.get("/:hash", async (req: any, res: any) => {
  const hash = req.params.hash;
  const response = await axios.get(
    `https://creatopy-cdn-b1a8267.s3.amazonaws.com/designs/${hash}/json`
  );
  const responseData: RootType = response.data;
  const appHtml = renderToString(<App data={responseData} />);

  const fontLinks = responseData.banner.elements[0].elements
    .map((item: ElementType) => {
      if (item.layerType === "text") {
        const formattedFontName =
          item.properties.config?.nodes[0].children[0].fontSettings.fontFamily.replace(
            / /g,
            "+"
          );
        return `<link href="https://fonts.googleapis.com/css2?family=${formattedFontName}:wght@${item.properties.config?.nodes[0].children[0].fontSettings.fontWeight}&display=swap" rel="stylesheet">`;
      } else if (item.layerType === "button") {
        const formattedFontName = item.properties.labelStyle.fontFamily.replace(
          / /g,
          "+"
        );
        return `<link href="https://fonts.googleapis.com/css2?family=${formattedFontName}:wght@${item.properties.labelStyle.fontWeight}&display=swap" rel="stylesheet">`;
      }
    })
    .join("\n");

  const html = ` 
    <!DOCTYPE html> 
    <html lang="en" style="margin: 0; padding: 0;>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        ${fontLinks}
        <title>Creatopy Challenge</title>
      </head>
      <body style="margin: 0; padding: 0;">
        <div id="root">${appHtml}</div>
          <script> 
          window.__INITIAL_DATA__ = ${JSON.stringify(responseData).replace(
            /</g,
            "\\u003c"
          )}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html> 
  `;

  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
