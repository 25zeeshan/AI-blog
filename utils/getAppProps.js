import { getSession } from "@auth0/nextjs-auth0"
import clientPromise from "../lib/mongodb";

export const getAppProps = async(context) => {
    const userSession = await getSession(context.req, context.res);

    const client = await clientPromise;
    const db = client.db('blog_standard');

    const user = await db.collection('users').findOne({
        auth0Id: userSession.user.sub
    });

    if(!user){
        return{
            availableTokens: 0,
            posts: []
        }
    }

    const posts = await db.collection('posts').find({
        userId : user._id,
    }).sort({
        createdDate : -1
    }).toArray()

    return {
        availableTokens : user.availableTokens,
        posts : posts.map(({createdDate, _id, userId, ...rest} )=> ({
            _id : _id.toString(),
            createdDate : createdDate.toString(),
            ...rest
        })),
        postId: context.params?.postId || null
    }
}