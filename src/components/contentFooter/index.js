import React from "react";
import contentFooterStyle from "./style";

const ContentFooter = () => {
  const style = contentFooterStyle();
  return (
    <footer className={style.root}>
      <p className={style.copyrightText}>
        Copyright &copy; 2020 Birr bets. All rights reserved.
      </p>
    </footer>
  );
};

export default ContentFooter;
