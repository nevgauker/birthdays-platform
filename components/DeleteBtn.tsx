'use client'
import { useRouter } from "next/navigation";

type DeleteBtnProps = {
    id: string;
};

export function DeletePartyButton({ id }: DeleteBtnProps) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this party?");
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/parties/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete the party.");
            }

            // Optional: refresh or navigate away
            router.refresh(); // or router.push("/parties") if you're on a list page
        } catch (error) {
            console.error("Error deleting party:", error);
            alert("Something went wrong while deleting.");
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="text-red-600 hover:underline"
        >
            Delete
        </button>
    );
};

