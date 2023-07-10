import React from "react";

type PropsType = {
  type: string;
  callBack: (newisDone:boolean) => void;
  checked: boolean;
};

export const Input = (props: PropsType) => {




  const onCLickInput = () => {
    props.callBack(e.currentTarget.checked);
  };
  return (
    <input type={props.type} onChange={onCLickInput} checked={props.checked} />
  );
};
