import { IconType } from "react-icons";

export type ControlSigningsType = {
  info: {
    name: string;
    icon: {
      bgColor: string;
      color: string;
      icon: IconType;
    };
    title: string;
    hour: {
      h: number;
      m: number;
      s: number;
    };
  }[];
  controls: {
    name: string;
    disabled: boolean;
    hidden: boolean;
    icon: {
      bgColor: string;
      color: string;
      icon: IconType;
    };
    title: string;
    action?: () => void; //Por el momento
  }[];
};
