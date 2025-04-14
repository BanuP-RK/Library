const books = [];
    const buybooks = [];

    function showPanel(panelId) {
      document.querySelectorAll('.panel').forEach(panel => panel.style.display = 'none');
      document.getElementById(panelId).style.display = 'block';
    }

    function showHome() {
      document.querySelectorAll('.panel').forEach(panel => panel.style.display = 'none');
      document.getElementById('admin').style.visibility ="visible";
      document.getElementById('customer').style.visibility ="visible";
      document.getElementById('home').style.visibility ="hidden";
      
    }

    function showAdminPanel() {
      document.getElementById('admin').style.visibility="hidden";
      document.getElementById('customer').style.visibility="hidden";
      showPanel('admin-panel');
      
    }

    function showCustomerPanel() {
      
      if (books.length === 0) {
        alert("No Books Available");
        return;
      }
      document.getElementById('admin').style.visibility="hidden";
      document.getElementById('customer').style.visibility="hidden";
      showPanel('customer-panel');
    }

    function generateBookInputs() {
      const count = parseInt(document.getElementById('book-count').value);
      const container = document.getElementById('book-inputs');
      container.innerHTML = '';

      if (!count || count <= 0 || count > 2) {
        alert("Enter a valid number of books");
        return;
      }

      for (let i = 0; i < count; i++) {
        container.innerHTML += `
          <div class="book-entry">
            <input placeholder="Book Name" id="bname-${i}">
            <input placeholder="Author Name" id="aname-${i}">
            <input placeholder="Year" id="year-${i}">
            <input placeholder="Price" id="price-${i}" type="number">
          </div>
        `;
      }
    }

    function submitBooks() {
      const count = parseInt(document.getElementById('book-count').value);
      if (!count || count <= 0 || count > 2) {
        alert("Enter a valid number of books");
        return;
      }
      for (let i = 0; i < count; i++) {
        const bname = document.getElementById(`bname-${i}`).value.trim();
        const aname = document.getElementById(`aname-${i}`).value.trim();
        const year = document.getElementById(`year-${i}`).value.trim();
        const price = parseFloat(document.getElementById(`price-${i}`).value);

        if (bname && aname && year && !isNaN(price)) {
          books.push({ bname, aname, year, price });
        }
      }
      alert(`${books.length} book(s) added successfully!`);
      document.getElementById('book-inputs').innerHTML = '';
      document.getElementById('book-count').value = '';
    }

    function showAvailableBooks() {
     
                   
                             
      const alist = document.getElementById('book-display');
      alist.innerHTML = '';
      books.forEach((book, i) => {
        const item = document.createElement('li');
        item.textContent = `${i + 1}. ${book.bname} by ${book.aname}, ${book.year} - ₹${book.price}`;
        alist.appendChild(item);
      });
      showPanel('book-list',''); 
              
              
              
    }

    function startRenting() {
      document.getElementById('rent-section').classList.remove('hidden');
    }

    function generateRentInputs() {
      const count = parseInt(document.getElementById('rent-count').value);
      const container = document.getElementById('rent-inputs');
      container.innerHTML = ''; 
      if (!count || count <= 0) {
        alert("Enter a valid number of books to rent");
        return;
      }

      for (let i = 0; i < count; i++) {
        container.innerHTML += `
          <div class="rent-entry">
            <input placeholder="Book Name" id="rbook-${i}">
            <input placeholder="Days to Rent" id="days-${i}" type="number">
          </div>
        `;
      }
    }

    function submitRent() {
      buybooks.length = 0; // reset
      const count = parseInt(document.getElementById('rent-count').value);

      if (isNaN(count) || count > books.length) {
        alert("You can rent only from available books.");
        return;
      }

      for (let i = 0; i < count; i++) {
        const rbook = document.getElementById(`rbook-${i}`).value.trim();
        const days = parseInt(document.getElementById(`days-${i}`).value);

        const matchedBook = books.find(book => book.bname.toLowerCase() === rbook.toLowerCase());

        if (matchedBook && !isNaN(days)) {
          buybooks.push({ bookname: matchedBook.bname, days });
        }
      }

      if (buybooks.length !== count) {
        alert("You can rent only from available books.");
        return;
      }

      const rentPerDay = 500;
      buybooks.forEach(book => {
        const total = book.days * rentPerDay;
        alert(`BOOK: ${book.bookname}\nDays: ${book.days}\nTotal: ₹${total}`);
      });

      document.getElementById('rent-inputs').innerHTML = '';
      document.getElementById('rent-count').value = '';
    }