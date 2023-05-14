import useSwr from "swr"
import fetcher from "../libs/fetcher"

const useCurrentUser = (userId: String) => {
    const { data, error, isLoading, mutate } = useSwr(userId ? `/api/users/${userId}` : null, fetcher)

    return { data, error, isLoading, mutate }
}

export default useCurrentUser