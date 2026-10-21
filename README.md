# DoKa

Aplikacja do komunikacji grupowej w stylu Discorda, z interfejsem inspirowanym TeamSpeakiem. Serwery z kanałami tekstowymi i głosowymi, wiadomości, obrazki i rozmowy prywatne.

Projekt zaliczeniowy JS2026, Wydział Informatyki Politechniki Białostockiej.

## Zespół

| Osoba | Rola | Zakres |
| --- | --- | --- |
| Karol Paszkowski | lider | serwery, kanały, wiadomości, role, kanały głosowe |
| Dominika | członek | logowanie, profil, załączniki, wiadomości prywatne, wyszukiwanie |

## Funkcje (MVP)

- [ ] Rejestracja i logowanie
- [ ] Serwery i dołączanie przez kod zaproszenia
- [x] Kanały tekstowe: tworzenie, edycja, usuwanie *(API w pamięci)*
- [x] Wiadomości: wysyłanie, edycja, usuwanie *(API w pamięci)*
- [ ] Obrazki i pliki w wiadomościach
- [ ] Wiadomości prywatne
- [x] Wyszukiwanie wiadomości *(podstawowe, po treści)*
- [ ] Role w serwerze: właściciel, admin, członek
- [ ] Lista członków ze statusem online

**Rozszerzenie techniczne:** wiadomości na żywo (WebSocket / Socket.IO) i kanały głosowe (WebRTC).

## Technologie

- Backend: Node.js 22, Express 5, Zod (walidacja)
- Baza danych: SQLite *(od etapu 4)*
- Frontend: Vue 3, Vue Router, Pinia *(od etapu 8)*

## Uruchomienie

Wymagany Node.js 22 lub nowszy.

```bash
cd server
npm install
npm run dev
```

API działa pod `http://localhost:3000/api`. Sprawdzenie: `http://localhost:3000/api/health`.

## Struktura projektu

```
DoKa/
├─ server/
│  ├─ src/
│  │  ├─ app.js            # konfiguracja Express, middleware, trasy
│  │  ├─ server.js         # start serwera
│  │  ├─ routes/           # definicje endpointów
│  │  ├─ controllers/      # logika obsługi żądań
│  │  ├─ middleware/       # logowanie, walidacja, 404, błędy
│  │  ├─ validation/       # schematy Zod
│  │  ├─ data/             # dane w pamięci (tymczasowo)
│  │  └─ utils/            # klasa HttpError
│  └─ requests/doka.http   # testy ręczne API
└─ README.md
```

## API

Wszystkie odpowiedzi w JSON. Błędy mają jeden format:

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Niepoprawne dane", "details": [] } }
```

| Metoda | Ścieżka | Opis |
| --- | --- | --- |
| GET | /api/health | Status serwera |
| GET, POST | /api/users | Lista / nowy użytkownik |
| GET | /api/users/:id | Jeden użytkownik |
| GET, POST | /api/servers | Lista / nowy serwer |
| GET, PATCH, DELETE | /api/servers/:id | Serwer z kanałami / zmiana nazwy / usunięcie |
| GET, POST | /api/servers/:serverId/channels | Kanały serwera (`?type=text\|voice`) / nowy kanał |
| PATCH, DELETE | /api/channels/:id | Zmiana nazwy / usunięcie kanału |
| GET, POST | /api/channels/:channelId/messages | Wiadomości (`?limit=&q=`) / nowa wiadomość |
| PATCH, DELETE | /api/messages/:id | Edycja / usunięcie wiadomości |

Kody odpowiedzi: 200, 201 (utworzono), 204 (usunięto), 400 (walidacja), 404 (brak zasobu), 409 (konflikt), 500.

## Dziennik postępów

### Etap 3 – Podstawowe API (25.10.2026)
- Inicjalizacja backendu: Node.js + Express 5, moduły ES.
- Middleware: logowanie żądań, CORS, parsowanie JSON, walidacja Zod, obsługa 404 i błędów.
- Endpointy REST dla użytkowników, serwerów, kanałów i wiadomości; dane w pamięci z danymi startowymi.
- Testy ręczne w pliku `server/requests/doka.http`.

### Etap 2 – Koncepcja (18.10.2026)
- Wybór tematu, wymagania MVP, podział zadań, model danych, makiety, utworzenie repozytorium.
