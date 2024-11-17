// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Stats animation
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-value');
        stats.forEach(stat => {
            const value = parseFloat(stat.textContent.replace(/,/g, ''));
            let startValue = 0;
            const duration = 1000;
            const start = performance.now();

            function updateValue(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                const currentValue = progress * value;
                stat.textContent = stat.textContent.includes('%')
                    ? currentValue.toFixed(1) + '%'
                    : Math.floor(currentValue).toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateValue);
                }
            }

            requestAnimationFrame(updateValue);
        });
    };

    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 3000);
    });

    // Friend request handling function
    const sendFriendRequest = async (friendId) => {
        try {
            const response = await fetch('./src/handle_friend_request.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'send_request',
                    friend_id: friendId
                })
            });

            const data = await response.json();
            if (data.success) {
                // Update the search result item to show pending status
                const searchItem = document.querySelector(`[data-user-id="${friendId}"]`);
                if (searchItem) {
                    searchItem.innerHTML = '<div class="pending-status">Friend Request Sent</div>';
                }

                // Show success message
                showMessage('Friend request sent successfully!', 'success');
            } else {
                showMessage(data.message || 'Failed to send friend request', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('An error occurred while sending the request', 'error');
        }
    };

    // Message display function
    const showMessage = (message, type = 'success') => {
        const messageContainer = document.createElement('div');
        messageContainer.className = `alert alert-${type} message-container`;
        messageContainer.textContent = message;

        document.querySelector('.container').insertAdjacentElement('afterbegin', messageContainer);

        setTimeout(() => {
            messageContainer.style.opacity = '0';
            setTimeout(() => messageContainer.remove(), 300);
        }, 3000);
    };

    // Friend search functionality
    const initFriendSearch = () => {
        const searchInput = document.getElementById('friendSearch');
        const searchResults = document.getElementById('searchResults');

        if (!searchInput || !searchResults) return;

        let searchTimeout;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();

            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }

            searchTimeout = setTimeout(() => {
                fetch(`./src/search_users.php?query=${encodeURIComponent(query)}`)
                    .then(response => response.json())
                    .then(data => {
                        searchResults.innerHTML = '';
                        if (data.length > 0) {
                            data.forEach(user => {
                                const resultDiv = document.createElement('div');
                                resultDiv.className = 'search-result-item';
                                resultDiv.setAttribute('data-user-id', user.id);
                                resultDiv.innerHTML = `
                                    <div class="user-info">
                                        <img src="../${user.profilePic}" alt="${user.username}'s profile" class="search-result-pic">
                                        <span>${user.username}</span>
                                    </div>
                                    <button type="button" class="btn btn-sm btn-primary send-request-btn">
                                        Add Friend
                                    </button>
                                `;

                                // Add click event listener to the button
                                const button = resultDiv.querySelector('.send-request-btn');
                                button.addEventListener('click', () => {
                                    sendFriendRequest(user.id);
                                });

                                searchResults.appendChild(resultDiv);
                            });
                            searchResults.style.display = 'block';
                        } else {
                            searchResults.innerHTML = '<div class="no-results">No users found</div>';
                            searchResults.style.display = 'block';
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        searchResults.innerHTML = '<div class="no-results">Error searching for users</div>';
                        searchResults.style.display = 'block';
                    });
            }, 300);
        });

        // Hide search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchResults.contains(e.target) && e.target !== searchInput) {
                searchResults.style.display = 'none';
            }
        });
    };

    // Initialize all functionality
    const init = () => {
        animateStats();
        initFriendSearch();
    };

    // Run initialization
    init();
    initPendingRequests();
});

function initPendingRequests() {
    const requestsSection = document.getElementById('pendingRequestsSection');
    const requestsList = document.getElementById('pendingRequestsList');

    if (!requestsSection || !requestsList) return;

    // Update section visibility based on content
    function updateSectionVisibility() {
        const hasRequests = requestsList.querySelector('.request-card') !== null;
        requestsSection.classList.toggle('has-requests', hasRequests);

        if (!hasRequests) {
            requestsList.innerHTML = '<p class="no-requests">No pending friend requests</p>';
        }
    }

    // Handle request actions (accept/reject)
    window.handleRequestAction = async function(form, action) {
        event.preventDefault();

        const requestCard = form.closest('.request-card');
        const requestId = requestCard.dataset.requestId;

        try {
            // Add removing animation
            requestCard.classList.add('removing');

            // Submit the form data
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to process request');

            // Wait for animation to complete
            setTimeout(() => {
                requestCard.remove();
                updateSectionVisibility();
            }, 300);

            // Show success message
            const message = action === 'accept' ? 'Friend request accepted!' : 'Friend request rejected';
            showMessage(message, 'success');

        } catch (error) {
            console.error('Error:', error);
            requestCard.classList.remove('removing');
            showMessage('Failed to process request', 'error');
        }

        return false;
    };

    // Show message function
    function showMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert alert-${type}`;
        messageDiv.style.animation = 'fadeInOut 0.3s ease-out';
        messageDiv.textContent = message;

        const container = document.querySelector('.container');
        container.insertBefore(messageDiv, container.firstChild);

        setTimeout(() => {
            messageDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }

    // Initial visibility check
    updateSectionVisibility();
}