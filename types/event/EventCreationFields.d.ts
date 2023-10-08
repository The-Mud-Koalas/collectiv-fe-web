interface EventCreationFields {
  name: string;
  category: SelectOption<string>;
  description?: string;
  project_goal?: number;
  goal_measurement?: string;
  goal_measurement_unit?: SelectOption<string>;
  start_date_time: Date;
  end_date_time: Date;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  tags: SelectOption<string>[];
  image: {
    url: string;
    file: File;
  }
}

interface NewEventFields {
  eventValues: EventCreationFields;
  isProject: boolean;
}