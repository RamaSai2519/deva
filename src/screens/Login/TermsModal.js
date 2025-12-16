import React from 'react';
import { IoClose } from 'react-icons/io5';

const TermsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={`fixed right-0 left-0 top-0 w-full h-full z-50 pt-10 px-10 overflow-auto transition-all duration-500 ${isOpen ? 'visible backdrop-blur-md' : 'invisible'}`}>
            <div className={`bg-black w-full h-auto min-h-full rounded-3xl transition-all duration-500 p-8 md:p-12 ${isOpen ? 'animate-climb-up' : 'blur-3xl animate-fade-out'}`}>
                <div className="flex justify-end mb-6">
                    <button onClick={onClose} className="text-mutedWhite rounded-full bg-lightBlack p-1 hover:text-white transition-colors">
                        <IoClose className="text-2xl" />
                    </button>
                </div>
                <div className="w-full h-full max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Terms and Conditions</h2>
                    <p className="text-gray-400 text-sm mb-8">Last updated: January 2025</p>

                    <div className="text-gray-300 space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Participation</h3>
                            <p className="text-gray-300 leading-relaxed">By registering for Epoch 4.0, you agree to abide by these terms and conditions. This event is open to all students at GITAM University, Bengaluru.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Code of Conduct</h3>
                            <p className="text-gray-300 leading-relaxed">You'll maintain a respectful, inclusive environment. Harassment, discrimination, or disruptive behavior will result in immediate removal from the event without refund.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Intellectual Property</h3>
                            <p className="text-gray-300 leading-relaxed">All code and projects you create remain yours. By participating, you grant the GitHub Community Club a non-exclusive license to showcase your work for promotional purposes.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Privacy & Data</h3>
                            <p className="text-gray-300 leading-relaxed">Your personal information will only be used for event communication and improvements. We won't share your data with third parties without consent.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Epoch Coins</h3>
                            <p className="text-gray-300 leading-relaxed">You'll receive Epoch Coins when you register. Use them at gaming zones, VR experiences, and other interactive areas on campus. Coins are non-transferable and expire after the event.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Content Guidelines</h3>
                            <p className="text-gray-300 leading-relaxed">All submissions must be original work. No illegal, offensive, or copyrighted content without permission.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Competitions & Judging</h3>
                            <p className="text-gray-300 leading-relaxed">Decisions made by judges are final. Prizes are non-transferable and cannot be exchanged for cash.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Liability</h3>
                            <p className="text-gray-300 leading-relaxed">The GitHub Community Club and event organizers aren't responsible for any loss, injury, or damage during Epoch 4.0. Participate at your own risk.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Media & Photos</h3>
                            <p className="text-gray-300 leading-relaxed">By attending, you consent to photography and videography. Your name, image, and likeness may be used in event promotion and social media.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-white">Changes to Terms</h3>
                            <p className="text-gray-300 leading-relaxed">We reserve the right to modify these terms at any time. Updates will be communicated through official channels.</p>
                        </div>

                        <div className="pt-4 border-t border-gray-800 mt-8">
                            <p className="text-gray-400 text-sm">By participating in Epoch 4.0, you acknowledge that you've read, understood, and agree to these terms and conditions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;