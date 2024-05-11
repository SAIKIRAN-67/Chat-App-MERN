// import Conversation from "./Conversation";
// import useGetConversations from "../../hooks/useGetConversation";
// import useConversation from "../../zustand/useConversation";
// import { getRandomEmoji } from "../../utils/emojis";
// const Conversations = () => {
// 	const {loading,conversations}=useGetConversations();
// 	console.log(conversations);
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			{conversations.map((conversation)=>{
// 				<Conversation
// 					key={conversation._id}
// 					conversation={conversation}
// 					emoji={getRandomEmoji()}
// 					lastIdx={idx===conversations.length-1}
// 				/>
// 			})}
// 			{loading?<span className="loading loading-spinner"></span>:null}
// 		</div>
// 	);
// };
// export default Conversations;
import useGetConversations from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	console.log(conversations);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;