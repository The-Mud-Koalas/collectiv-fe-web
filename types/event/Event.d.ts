type EventStatus =
  | "Scheduled"
  | "Cancelled"
  | "Ongoing"
  | "Cancelled"
  | "Completed";

type EventType = "Project" | "Initiative";

interface Tag {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface Transaction {
  project_id: string;
  transaction_time: string;
  transaction_value: number;
}

interface BaseEventDetail {
  id: string;
  name: string;
  description: string;
  status: "Scheduled" | "Ongoing" | "Completed" | "Cancelled";
  event_category: Category;
  min_num_of_volunteers: number;
  event_location: EventLocation;
  event_creator_id: string;
  event_start_date_time: string;
  event_end_date_time: string;
  event_tags: Tag[];
  current_num_of_participants: number;
  current_num_of_volunteers: number;
}

interface ProjectDetail extends BaseEventDetail {
  event_type: "project";
  goal: number;
  measurement_unit: string;
  progress: number;
  transactions: Transaction[];
}

interface InitiativeDetail extends BaseEventDetail {
  event_type: "initiative";
}

type EventDetail = ProjectDetail | InitiativeDetail;

type EventParticipation =
  | {
      is_registered: false;
    }
  | {
      is_registered: true;
      data: EventParticipationData;
    };

interface BaseEventParticipation {
  participant: string;
  registration_time: string;
  has_left_forum: boolean;
  rewarded: boolean;
  submitted_review: boolean;
  total_contribution: number;
  activities: { timestamp: string; contribution: number }[];
}

interface ContributorEventParticipation extends BaseEventParticipation {
  type: "contributor";
}

interface ParticipantEventParticipation extends BaseEventParticipation {
  type: "participant";
}

interface VolunteerEventParticipation extends BaseEventParticipation {
  type: "volunteer";
  has_manager_access: boolean;
}

type EventParticipationData =
  | ContributorEventParticipation
  | ParticipantEventParticipation
  | VolunteerEventParticipation;
