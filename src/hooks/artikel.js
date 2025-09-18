import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as artikelApi from "../axiosApi/artikel";

export const usePublicArticles = () => {
    return useQuery({
        queryKey: ["publicArticles"],
        queryFn: artikelApi.getPublicArticles,
    });
};

export const useMyArticles = () => {
    return useQuery({
        queryKey: ["myArticles"],
        queryFn: artikelApi.getMyArticles,
    });
};

export const useCreateArticle = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: artikelApi.createArticle,
        onSuccess: () => {
        qc.invalidateQueries(["publicArticles"]);
        qc.invalidateQueries(["myArticles"]);
        },
    });
};

export const useUpdateArticle = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => artikelApi.updateArticle(id, data),
        onSuccess: () => {
        qc.invalidateQueries(["publicArticles"]);
        qc.invalidateQueries(["myArticles"]);
        },
    });
};

export const useDeleteArticle = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: artikelApi.deleteArticle,
        onSuccess: () => {
        qc.invalidateQueries(["publicArticles"]);
        qc.invalidateQueries(["myArticles"]);
        },
    });
};