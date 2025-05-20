import { IconType } from "react-icons";

export type ControlSigningsType = {
  info: {
    name: NameInfo;
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
    name: NameControl;
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

export type TimeEntry = {
  id?: number;
  userId: number;
  clockIn: string;
  clockOut?: string ;
  duration?: number ;
  coordinates?: {lat:number,lon:number} | null ;
  timebreaks?: TimeBreak[];
};

export type TimeBreak = {
  id: number;
  timeEntryId: number;
  timeEntry: TimeEntry;
  clockIn: string;
  clockOut: string | null;
  duration: number | null;
  coordinates:{lat:number,lon:number} | null ;
  pauseTypeId: number;
  pauseType: PauseType;
  description: string;
};

export type CreateTimeBreak ={
  timeEntry:{connect:{id:number}}
  clockIn:Date,
  coordinates:{lat:number,lon:number} | null,
  pauseType:{connect:{id:number}},
  description:string|null
}

export type PauseType = {
  id: number;
  name: string;
  description:string;
  isPaid:true;
  requiresNotes:false;
};


export type NameControl = 'start' | 'pause' | 'play' | 'finish'
export type NameInfo = 'timeWorker' | 'timePause' | 'timeOut' 