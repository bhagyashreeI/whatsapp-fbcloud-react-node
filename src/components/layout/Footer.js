import React from "react";

function Footer() {
  return (
    <>
      <div className='footer flex_middle bg-head-foot'>
        <div className='text cursor_pointer'>
          <span style={{ marginBottom: "0.5em", fontSize: "0.8em" }}>
            {String.fromCodePoint("0X00A9")}
          </span>{" "}
          
          <span style={{ fontSize: "0.8em", fontWeight: "400" }}> 2023</span>
        </div>
      </div>
    </>
  )
}

export default Footer;