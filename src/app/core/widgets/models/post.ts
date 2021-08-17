
  export class Post {
    id: number;
    title: string;
    body: string;
    timestamp: string;
    user: any;
    nbResponses: any;
    userId: number;
    parentId: number;
    comments: any[];

    constructor(data: any) {
      if (data) {
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
        this.timestamp = data.timestamp;
        this.user = data.user;
        this.userId = data.userId;
        this.parentId = data.parentId;
        this.nbResponses = data.nbResponses;
        this.comments = data.comments;
      }
    }
  }

