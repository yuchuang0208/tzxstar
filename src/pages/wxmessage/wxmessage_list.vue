<template>
	<ul :class="wrapClassName">
		<message-item v-for="(item,idx) in messages" :message="item"  :key="idx"
			:status="status"
			:initInfo="initInfo"
			:getFansInfo="getFansInfo"
			:addMsgForCollection="addMsgForCollection"
			:replyTimeExpired="replyTimeExpired"
			:replyMsgToFans="replyMsgToFans"
			:updateLeaveMessage="updateLeaveMessage"
			:initFeedbackInfo="initFeedbackInfo"
		/>
	</ul>
</template>

<script>
	import MessageItem from './wxmessage_item'
	export default {
		props: {
			wrapClassName: {type: [String, Object, Array]},
			messages: {
				default: function() {
					return []
				},
				type: Array
			},
			getFansInfo: {
				type: Function,
				require: true
			},
			addMsgForCollection: {
				type: Function
			},
			status:{type:[String,Number]},
			replyTimeExpired: {type: Function},
			replyMsgToFans: {type: Function},
			updateLeaveMessage:{type: Function},
			initInfo:{type: Function},
			initFeedbackInfo:{type :Function}
		},
		data() {
			return {}
		},
		methods: {},
		components: {
			messageItem: MessageItem
		}
	}
</script>

<style>

</style>