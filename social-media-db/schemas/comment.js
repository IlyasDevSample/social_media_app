export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        {
            name: 'commentText',
            title: 'Comment Text',
            type: 'string',
        },
        {
            name: 'postedBy',
            title: 'Posted By',
            type: 'reference',
            to: [{type: 'user'}]
        }
    ]
}