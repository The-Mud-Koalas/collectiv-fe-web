interface EventCreationFields {
  name: string;
  category: SelectOption<string>;
  description?: string;
  project_goal?: number;
  goal_measurement_unit?: string;
  min_num_of_volunteers: number;
  start_date_time: Date;
  end_date_time: Date;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  tags: string[];
}