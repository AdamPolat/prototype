// Feedback Modal functionality
(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        var feedbackModal = document.getElementById('feedbackModalOverlay');
        if (!feedbackModal) return;

        var selectedRating = null;

        // Open feedback modal when clicking feedback button
        document.querySelectorAll('.header-feedback-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                feedbackModal.classList.add('open');
            });
        });

        // Close feedback modal
        var cancelBtn = document.getElementById('feedbackCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                feedbackModal.classList.remove('open');
                resetFeedbackForm();
            });
        }

        // Close modal when clicking outside
        feedbackModal.addEventListener('click', function(e) {
            if (e.target === feedbackModal) {
                feedbackModal.classList.remove('open');
                resetFeedbackForm();
            }
        });

        // Handle emoji selection
        document.querySelectorAll('.feedback-emoji-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                // Remove selected class from all buttons
                document.querySelectorAll('.feedback-emoji-btn').forEach(function(b) {
                    b.classList.remove('selected');
                });
                // Add selected class to clicked button
                this.classList.add('selected');
                selectedRating = this.getAttribute('data-rating');
            });
        });

        // Submit feedback
        var submitBtn = document.getElementById('feedbackSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                var commentsField = document.getElementById('feedbackComments');
                var comments = commentsField ? commentsField.value.trim() : '';

                if (!selectedRating) {
                    alert('Please select a rating');
                    return;
                }

                // Here you would send the feedback to your backend
                console.log('Feedback submitted:', {
                    rating: selectedRating,
                    comments: comments
                });

                // Show success state
                showFeedbackSuccess();
            });
        }

        // Show feedback success state
        function showFeedbackSuccess() {
            var formView = document.getElementById('feedbackFormView');
            var successView = document.getElementById('feedbackSuccessView');
            var modalHeader = feedbackModal.querySelector('.ukp-modal-header');

            if (formView && successView && modalHeader) {
                formView.classList.add('hidden');
                successView.classList.add('active');
                modalHeader.textContent = 'Feedback Sent';

                // Auto-close after 3 seconds
                setTimeout(function() {
                    feedbackModal.classList.remove('open');
                    // Reset after animation
                    setTimeout(function() {
                        resetFeedbackForm();
                        formView.classList.remove('hidden');
                        successView.classList.remove('active');
                        modalHeader.textContent = 'Give us your feedback';
                    }, 300);
                }, 3000);
            }
        }

        // Reset feedback form
        function resetFeedbackForm() {
            selectedRating = null;
            document.querySelectorAll('.feedback-emoji-btn').forEach(function(btn) {
                btn.classList.remove('selected');
            });
            var commentsField = document.getElementById('feedbackComments');
            if (commentsField) {
                commentsField.value = '';
            }
        }
    });
})();
