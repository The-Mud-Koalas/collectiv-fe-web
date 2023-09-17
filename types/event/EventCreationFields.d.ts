interface EventCreationFields {
    name: string;
    category: string;
    description?: string;
    project_goal?: number;
    goal_measurement_unit?: string;
    min_num_of_volunteers: number;
    start_date_time: string;
    end_date_time: string;
    location_id: string;
    tags: string[];
  }
  