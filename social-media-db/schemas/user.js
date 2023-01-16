export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'userName',
            title: 'User Name',
            type: 'string',
            validation : Rule => Rule.required()
        },
        {
            name: 'imageURL',
            title: 'Image URL',
            type: 'string'
        }
    ]
}