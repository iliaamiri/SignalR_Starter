import {Home} from "@/pages/home";
import {ChatHubConnectionContext} from "@/lib/contexts";
import {useSignalR} from "@/lib/hooks/useSignalR";
import {CannotConnect} from "@/pages/cannotConnect";
import {Loading} from "@/pages/loading";

function App() {
    const { connection: chatHubConnection, isConnectionFailed } = useSignalR("/r/chatHub");

    if (chatHubConnection === undefined) {
        return isConnectionFailed ? <CannotConnect /> : <Loading />;
    }

    return (
        <ChatHubConnectionContext.Provider value={chatHubConnection}>
            <Home/>
        </ChatHubConnectionContext.Provider>
    );
}

export default App
