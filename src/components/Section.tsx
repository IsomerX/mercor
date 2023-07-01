import React from "react";

type Props = {
  children: React.ReactNode;
};

const Section = (props: Props) => {
  return (
    <div className="relative top-0 mx-auto md:w-[95%] 2xl:w-[80%]">
      {props.children}
    </div>
  );
};

export default Section;
