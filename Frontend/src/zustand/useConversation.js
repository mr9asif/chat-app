import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null, // Corrected to `selectedConversation` for clarity
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default useConversation;
