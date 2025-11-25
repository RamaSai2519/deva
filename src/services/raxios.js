import { message } from "antd";
import Raxios from "./axiosHelper";

const RaxiosPost = async (url, data, isNotify = false, setLoading = null) => {
    setLoading && setLoading(true);
    try {
        const response = await Raxios.post(url, data);
        if (isNotify) {
            if (response.status === 200) {
                await message.success(response.msg);
            } else {
                await message.error(response.msg);
            }
        }
        setLoading && setLoading(false);
        return response;
    } catch (error) {
        await message.error(error.response?.data?.output_message || 'An error occurred');
        setLoading && setLoading(false);
    }
};

export default RaxiosPost;