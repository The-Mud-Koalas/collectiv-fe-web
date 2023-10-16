interface UserPreferenceFields {
    "full-name"?: string;
    "preferred-radius"?: number | null;
    "location-track"?: boolean | null;
}

interface UserData {
    full_name: string;
    preferred_radius: number | null;
    location_track: boolean | null;
    has_been_prompted_for_location_tracking: boolean;
    reward_points: number;
    preferred_radius: number;
    user_id: string;
}