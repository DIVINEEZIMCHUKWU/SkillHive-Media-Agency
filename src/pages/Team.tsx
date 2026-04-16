import { useState, useEffect } from 'react';
import { TeamMember, getTeam } from '../lib/store';
import { Link } from 'react-router-dom';

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    const loadTeam = () => {
      setTeam(getTeam());
    };
    
    loadTeam();
    window.addEventListener('teamUpdated', loadTeam);
    return () => window.removeEventListener('teamUpdated', loadTeam);
  }, []);

  return (
    <div className="pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6">Meet Our Team</h1>
          <p className="text-xl text-blue-700 font-medium">
            The experts behind the strategies.
          </p>
        </div>

        {team.length === 0 ? (
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-16 text-center">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">No Team Members Yet</h2>
            <p className="text-blue-800 max-w-2xl mx-auto mb-8">
              Head over to the Admin Dashboard to add your team members.
            </p>
            <Link to="/admin" className="bg-brand-blue text-white px-6 py-3 rounded-full font-medium hover:bg-blue-900 transition-colors">
              Go to Admin Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {team.map((member) => (
              <div key={member.id} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-all group-hover:-translate-y-2">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-2xl font-bold text-brand-blue mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed text-sm max-w-xs mx-auto">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
