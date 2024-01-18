import { getCandidates } from "../../utils/interect";
import { useState, useEffect } from "react";
// import profileAvatar from "../../../public/images/profile-avatar";

const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidates = await getCandidates();
        setCandidates(candidates);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const sortedCandidates = candidates?.sort((a, b) => b.voteCount - a.voteCount);

  return (
    <div className="container mx-auto my-8 max-h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8">Election Results</h1>
      {isLoading ? (
        <h1 className="text-3xl font-bold mb-8">Loading.......</h1>
      ) : (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table header */}
            <thead className="bg-gray-50">{/* Header rows */}</thead>
            {/* Table body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Render candidate rows */}
              {sortedCandidates?.map((candidate) => (
                <tr key={candidate.age.toString()}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          alt={`${candidate.name} - ${candidate.party}`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {candidate.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {candidate.party}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {candidate.party}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {candidate.voteCount.toString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Results;
