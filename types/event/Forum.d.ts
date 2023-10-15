interface ForumPost {
    id: string;
    content: string;
    author: string;
    author_name: string | null;
    author_role: 'participant' | 'volunteer' | 'contributor' | 'creator';
    forum: string;
    posted_at: string;
    is_anonymous: boolean;
    vote_count: number;
    upvoters: string[];
    downvoters: string[];
}