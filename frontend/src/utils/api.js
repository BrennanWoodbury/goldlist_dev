


export const fetchData = async (path) => {
    try {
        const response = await fetch(`http://localhost:8000/${path}`);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};