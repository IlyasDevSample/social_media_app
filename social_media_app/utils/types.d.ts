import { type } from "os";

type postedBy = {
    _id: string,
    imageURL: string,
    userName: string
}

type comment = {
    _id: string,
    commentText: string,
    postedBy: postedBy;
}

type like = {
    _key: string,
    _ref: string,
    _type: string
}

type video = {
    asset: {
        _id: string,
        url: string
    }
}

export interface IPost {
    _id: string;
    caption: string;
    comments: comment[];
    likes: like[];
    postedBy: postedBy;
    userId: string;
    video: video;
};