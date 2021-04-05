import React, { useEffect } from "react";
import { useHistory } from "react-router";
import "./Breadcrumb.css";
export const Breadcrumb = ({ text, r1, r2, r3, hrefr1, hrefr2, hrefr3 }) => {
let history = useHistory()
//   useEffect(() => {
//       let pathSplitArray = (window.location.pathname.split("/"));
//       pathSplitArray.map((path) => {
//         try {
//         //   let navItemr = document.querySelector(`.nav-item`);
//         //   navItemr.classList.remove("activeItem");
//           let navItem = document.querySelector(`.itemNav_${path}`);
//           navItem.classList.add("activeItem");
//         } catch (error) {}
//       });
//       console.log(history)
//   }, []);

  return (
    <div className="col-md-12 breadcrumbTop">
      <div className="myBreadcrumb">
        <p href="">{text}</p>
        <div className="rutaBreadcrumb">
          <p className="fontRuta">
            <a href={hrefr1}>{r1}</a>
          </p>
          {r2 ? <p className="signoRuta">{">"}</p> : ""}
          <p className="azulRuta fontRuta">
            <a href={hrefr2}>{r2}</a>
          </p>
          {r3 ? <p className="signoRuta">{">"}</p> : ""}
          <p className="azulRuta fontRuta">
            <a href={hrefr3}>{r3}</a>
          </p>
        </div>
      </div>
      <div className="separator-breadcrumb"></div>
    </div>
  );
};

export default Breadcrumb;
