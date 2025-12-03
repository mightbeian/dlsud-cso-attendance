/**
 * DLSU-D CSO Attendance System - Frontend JavaScript
 * Handles scanning, dynamic updates, modals, and API interactions
 */

let currentEditUserId = null;
let searchTimeout = null;

document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    refreshActiveUsers();
    setInterval(refreshActiveUsers, 30000);
    setupEventListeners();
    setDefaultExportDates();
    document.getElementById('idInput').focus();
});

function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', dateOptions);
    document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', timeOptions);
}

function setupEventListeners() {
    const idInput = document.getElementById('idInput');
    idInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            processIdScan(this.value);
        }
    });
    
    const adminBtn = document.getElementById('adminBtn');
    adminBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelector('.admin-dropdown').classList.toggle('active');
    });
    
    document.addEventListener('click', function() {
        document.querySelector('.admin-dropdown').classList.remove('active');
    });
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => handleSearch(this.value), 300);
    });
    
    searchInput.addEventListener('focus', function() {
        if (this.value.trim()) handleSearch(this.value);
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-section')) {
            document.getElementById('searchResults').classList.remove('active');
        }
    });
    
    const manageSearchInput = document.getElementById('manageSearchInput');
    manageSearchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => loadUsersTable(this.value), 300);
    });
    
    document.getElementById('userForm').addEventListener('submit', handleUserFormSubmit);
    
    document.getElementById('formPhoto').addEventListener('change', function() {
        const fileName = this.files[0] ? this.files[0].name : 'Choose a file...';
        document.getElementById('photoFileName').textContent = fileName;
    });
}

async function processIdScan(studentId) {
    studentId = studentId.trim();
    if (!studentId) { showStatus('Please enter an ID number.', 'error'); return; }
    
    try {
        const response = await fetch('/api/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: studentId })
        });
        const data = await response.json();
        
        if (data.success) {
            updateUserPhoto(data.user);
            if (data.is_birthday) {
                showStatus(data.message, 'birthday');
                document.getElementById('photoFrame').classList.add('birthday');
            } else {
                showStatus(data.message, 'success');
                document.getElementById('photoFrame').classList.add('active');
            }
            refreshActiveUsers();
            setTimeout(() => resetScanner(), 3000);
        } else {
            showStatus(data.message, 'error');
            document.getElementById('photoFrame').classList.add('error');
            setTimeout(() => resetScanner(), 2000);
        }
    } catch (error) {
        console.error('Error processing scan:', error);
        showStatus('An error occurred. Please try again.', 'error');
        setTimeout(() => resetScanner(), 2000);
    }
}

function updateUserPhoto(user) {
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const userPhoto = document.getElementById('userPhoto');
    if (user && user.photo_filename) {
        userPhoto.src = `/static/photos/${user.photo_filename}`;
        userPhoto.classList.remove('hidden');
        photoPlaceholder.style.display = 'none';
    } else {
        userPhoto.classList.add('hidden');
        photoPlaceholder.style.display = 'flex';
    }
}

function showStatus(message, type) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.innerHTML = `<p>${message}</p>`;
    statusMessage.className = 'status-message';
    if (type) statusMessage.classList.add(type);
}

function resetScanner() {
    const idInput = document.getElementById('idInput');
    idInput.value = '';
    idInput.focus();
    showStatus('Ready to scan', '');
    document.getElementById('photoFrame').className = 'photo-frame';
    document.getElementById('photoPlaceholder').style.display = 'flex';
    document.getElementById('userPhoto').classList.add('hidden');
}

async function refreshActiveUsers() {
    try {
        const response = await fetch('/api/active-users');
        const data = await response.json();
        if (data.success) {
            updateActiveUsersSidebar(data.active_users);
            document.getElementById('activeCount').textContent = data.total_count;
        }
    } catch (error) { console.error('Error refreshing active users:', error); }
}

function updateActiveUsersSidebar(groupedUsers) {
    Object.keys(groupedUsers).forEach(committee => {
        const section = document.querySelector(`.committee-section[data-committee="${committee}"]`);
        if (!section) return;
        const userList = section.querySelector('.user-list');
        const users = groupedUsers[committee];
        if (users.length > 0) {
            section.classList.add('has-users');
            userList.innerHTML = users.map(user => `
                <li>
                    ${user.photo_filename 
                        ? `<img src="/static/photos/${user.photo_filename}" alt="${user.full_name}" class="user-avatar">`
                        : `<div class="user-avatar-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`}
                    <div class="user-info"><div class="user-name">${user.full_name}</div><div class="user-id">${user.student_id}</div></div>
                    <span class="online-indicator"></span>
                </li>
            `).join('');
        } else {
            section.classList.remove('has-users');
            userList.innerHTML = '';
        }
    });
}

async function handleSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!query.trim()) { searchResults.classList.remove('active'); return; }
    try {
        const response = await fetch(`/api/users?search=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.success && data.users.length > 0) {
            searchResults.innerHTML = data.users.map(user => `
                <div class="search-result-item" onclick="selectSearchResult('${user.student_id}')">
                    ${user.photo_filename ? `<img src="/static/photos/${user.photo_filename}" alt="${user.full_name}">` : `<div class="placeholder-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`}
                    <div class="info"><div class="name">${user.full_name}</div><div class="details">${user.student_id} • ${user.committee}</div></div>
                </div>
            `).join('');
            searchResults.classList.add('active');
        } else {
            searchResults.innerHTML = '<div class="no-results">No users found</div>';
            searchResults.classList.add('active');
        }
    } catch (error) { console.error('Error searching users:', error); }
}

function selectSearchResult(studentId) {
    document.getElementById('searchResults').classList.remove('active');
    document.getElementById('searchInput').value = '';
    const idInput = document.getElementById('idInput');
    idInput.value = studentId;
    idInput.focus();
    processIdScan(studentId);
}

function openAddUserModal() {
    currentEditUserId = null;
    document.getElementById('userModalTitle').textContent = 'Add New User';
    document.getElementById('userFormSubmit').textContent = 'Add User';
    document.getElementById('userForm').reset();
    document.getElementById('editUserId').value = '';
    document.getElementById('formStudentId').disabled = false;
    document.getElementById('photoFileName').textContent = 'Choose a file...';
    document.getElementById('userModal').classList.add('active');
}

function openEditUserModal(user) {
    currentEditUserId = user.id;
    document.getElementById('userModalTitle').textContent = 'Edit User';
    document.getElementById('userFormSubmit').textContent = 'Save Changes';
    document.getElementById('editUserId').value = user.id;
    document.getElementById('formStudentId').value = user.student_id;
    document.getElementById('formStudentId').disabled = true;
    document.getElementById('formFullName').value = user.full_name;
    document.getElementById('formCommittee').value = user.committee;
    document.getElementById('formBirthday').value = user.birthday || '';
    document.getElementById('photoFileName').textContent = user.photo_filename || 'Choose a file...';
    document.getElementById('userModal').classList.add('active');
}

function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
    currentEditUserId = null;
}

async function handleUserFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const userId = document.getElementById('editUserId').value;
    try {
        let response;
        if (userId) {
            response = await fetch(`/api/users/${userId}`, { method: 'PUT', body: formData });
        } else {
            response = await fetch('/api/users', { method: 'POST', body: formData });
        }
        const data = await response.json();
        if (data.success) {
            showToast(data.message, 'success');
            closeUserModal();
            if (document.getElementById('manageUsersModal').classList.contains('active')) loadUsersTable();
            refreshActiveUsers();
        } else { showToast(data.message, 'error'); }
    } catch (error) {
        console.error('Error saving user:', error);
        showToast('An error occurred. Please try again.', 'error');
    }
}

function openManageUsersModal() {
    document.getElementById('manageUsersModal').classList.add('active');
    document.getElementById('manageSearchInput').value = '';
    loadUsersTable();
}

function closeManageUsersModal() { document.getElementById('manageUsersModal').classList.remove('active'); }

async function loadUsersTable(search = '') {
    try {
        const response = await fetch(`/api/users?search=${encodeURIComponent(search)}`);
        const data = await response.json();
        if (data.success) {
            const tbody = document.getElementById('usersTableBody');
            if (data.users.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 40px; color: var(--gray-500);">No users found</td></tr>`;
                return;
            }
            tbody.innerHTML = data.users.map(user => `
                <tr>
                    <td>${user.photo_filename ? `<img src="/static/photos/${user.photo_filename}" alt="${user.full_name}" class="user-avatar-small">` : `<div class="avatar-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`}</td>
                    <td>${user.student_id}</td>
                    <td>${user.full_name}</td>
                    <td>${user.committee}</td>
                    <td>${user.birthday || '-'}</td>
                    <td><span class="status-badge ${user.status === 'Online' ? 'status-online' : 'status-offline'}">${user.status}</span></td>
                    <td>
                        <div class="actions">
                            <button class="action-btn edit" onclick='openEditUserModal(${JSON.stringify(user)})' title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                            <button class="action-btn delete" onclick="deleteUser(${user.id}, '${user.full_name}')" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) { console.error('Error loading users table:', error); }
}

async function deleteUser(userId, userName) {
    if (!confirm(`Are you sure you want to delete "${userName}"? This will also delete all their attendance records.`)) return;
    try {
        const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
            showToast(data.message, 'success');
            loadUsersTable(document.getElementById('manageSearchInput').value);
            refreshActiveUsers();
        } else { showToast(data.message, 'error'); }
    } catch (error) {
        console.error('Error deleting user:', error);
        showToast('An error occurred. Please try again.', 'error');
    }
}

function openExportModal() {
    document.getElementById('exportModal').classList.add('active');
    setDefaultExportDates();
}

function closeExportModal() { document.getElementById('exportModal').classList.remove('active'); }

function setDefaultExportDates() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    document.getElementById('startDate').value = formatDate(firstDayOfMonth);
    document.getElementById('endDate').value = formatDate(today);
}

function formatDate(date) { return date.toISOString().split('T')[0]; }

function exportDTR() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    if (!startDate || !endDate) { showToast('Please select both start and end dates.', 'error'); return; }
    window.location.href = `/api/export/dtr?start_date=${startDate}&end_date=${endDate}`;
    showToast('DTR export started. Download will begin shortly.', 'success');
    closeExportModal();
}

function exportRoster() {
    window.location.href = '/api/export/roster';
    showToast('Roster export started. Download will begin shortly.', 'success');
    closeExportModal();
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.className = 'toast';
    toast.classList.add(type);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeUserModal();
        closeManageUsersModal();
        closeExportModal();
        document.getElementById('searchResults').classList.remove('active');
    }
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        if (e.key.match(/^[0-9]$/)) document.getElementById('idInput').focus();
    }
});
