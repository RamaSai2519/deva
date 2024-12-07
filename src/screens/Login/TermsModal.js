import React from 'react';

const TermsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-30 p-8 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto backdrop-filter backdrop-blur-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-white">Terms and Conditions</h2>
                <div className="text-gray-300 mb-6">
                    <h3 className="text-xl font-semibold mb-2">Participation</h3>
                    <p>By registering for GitHub Epoch TechFest, you agree to abide by these terms and conditions.</p>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-4">Code of Conduct</h3>
                    <p>Participants must adhere to the GitHub Community Guidelines and maintain a respectful, inclusive environment.</p>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-4">Intellectual Property</h3>
                    <p>All code and projects created during the event remain the property of their creators. Participants grant GitHub a non-exclusive license to showcase projects for promotional purposes.</p>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-4">Privacy</h3>
                    <p>Personal information collected will be used solely for event-related communications and will not be shared with third parties.</p>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-4">Content Restrictions</h3>
                    <p>Submissions must not contain any illegal, offensive, or infringing content.</p>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-4">Judging</h3>
                    <p>Decisions made by the judging panel are final and binding.</p>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-4">Prizes</h3>
                    <p>Prizes are non-transferable and cannot be exchanged for cash.</p>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-4">Liability</h3>
                    <p>GitHub and event organizers are not responsible for any loss, injury, or damage incurred during the event.</p>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-4">Media Release</h3>
                    <p>Participants consent to the use of their name, image, and likeness in event-related media and promotional materials.</p>
                    
                    <h3 className="text-xl font-semibold mb-2 mt-4">Modifications</h3>
                    <p>Organizers reserve the right to modify these terms and conditions at any time without prior notice.</p>
                    
                    <p className="mt-4">By participating in GitHub Epoch TechFest, you acknowledge that you have read, understood, and agree to these terms and conditions.</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-white px-4 py-2 rounded transition-colors"
                    style={{ background: 'linear-gradient(to bottom, #000000, #3533cd)' }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default TermsModal;