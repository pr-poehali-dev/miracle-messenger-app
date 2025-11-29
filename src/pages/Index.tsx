import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
  status?: string;
}

interface Theme {
  id: string;
  name: string;
  gradient: string;
}

const THEMES: Theme[] = [
  { id: 'default', name: 'Purple Dream', gradient: 'gradient-purple' },
  { id: 'sunset', name: 'Sunset Vibes', gradient: 'gradient-sunset' },
  { id: 'ocean', name: 'Ocean Wave', gradient: 'gradient-ocean' },
  { id: 'fire', name: 'Fire Storm', gradient: 'gradient-fire' }
];

const MOCK_CHATS: Chat[] = [
  {
    id: 1,
    name: 'Алексей Иванов',
    avatar: '👨‍💼',
    lastMessage: 'Привет! Как дела с проектом?',
    time: '14:32',
    unread: 3,
    online: true
  },
  {
    id: 2,
    name: 'Мария Петрова',
    avatar: '👩‍🎨',
    lastMessage: 'Отправила тебе файлы',
    time: '13:15',
    online: true
  },
  {
    id: 3,
    name: 'Команда Разработки',
    avatar: '👥',
    lastMessage: 'Встреча в 15:00',
    time: '12:45',
    unread: 1
  },
  {
    id: 4,
    name: 'Дмитрий Сидоров',
    avatar: '👨‍💻',
    lastMessage: 'Проверь последний коммит',
    time: 'Вчера'
  },
  {
    id: 5,
    name: 'Анна Козлова',
    avatar: '👩‍🔬',
    lastMessage: 'Спасибо за помощь!',
    time: 'Вчера',
    online: true
  },
  {
    id: 6,
    name: 'Сергей Новиков',
    avatar: '🧑‍🚀',
    lastMessage: 'Созвонимся завтра?',
    time: '15 ноя'
  }
];

export default function Index() {
  const [activeView, setActiveView] = useState<'chats' | 'contacts' | 'profile' | 'settings'>('chats');
  const [currentTheme, setCurrentTheme] = useState('default');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const applyTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  };

  const filteredChats = MOCK_CHATS.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-background">
      <div className="w-20 bg-card border-r border-border flex flex-col items-center py-6 gap-6">
        <div className={`w-12 h-12 rounded-2xl ${THEMES.find(t => t.id === currentTheme)?.gradient} flex items-center justify-center text-2xl font-bold text-white shadow-lg animate-pulse-gradient bg-[length:200%_200%]`}>
          M
        </div>
        
        <nav className="flex-1 flex flex-col gap-4">
          <Button
            variant={activeView === 'chats' ? 'default' : 'ghost'}
            size="icon"
            className={`w-12 h-12 rounded-2xl transition-all ${activeView === 'chats' ? 'gradient-purple text-white shadow-lg' : 'hover:bg-muted'}`}
            onClick={() => setActiveView('chats')}
          >
            <Icon name="MessageCircle" size={22} />
          </Button>
          
          <Button
            variant={activeView === 'contacts' ? 'default' : 'ghost'}
            size="icon"
            className={`w-12 h-12 rounded-2xl transition-all ${activeView === 'contacts' ? 'gradient-purple text-white shadow-lg' : 'hover:bg-muted'}`}
            onClick={() => setActiveView('contacts')}
          >
            <Icon name="Users" size={22} />
          </Button>
          
          <Button
            variant={activeView === 'profile' ? 'default' : 'ghost'}
            size="icon"
            className={`w-12 h-12 rounded-2xl transition-all ${activeView === 'profile' ? 'gradient-purple text-white shadow-lg' : 'hover:bg-muted'}`}
            onClick={() => setActiveView('profile')}
          >
            <Icon name="User" size={22} />
          </Button>
        </nav>

        <Button
          variant={activeView === 'settings' ? 'default' : 'ghost'}
          size="icon"
          className={`w-12 h-12 rounded-2xl transition-all ${activeView === 'settings' ? 'gradient-purple text-white shadow-lg' : 'hover:bg-muted'}`}
          onClick={() => setActiveView('settings')}
        >
          <Icon name="Settings" size={22} />
        </Button>
      </div>

      {activeView === 'chats' && (
        <>
          <div className="w-96 border-r border-border flex flex-col bg-card">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold gradient-text">Чаты</h1>
                <Badge variant="secondary" className="gradient-purple text-white border-0">
                  {MOCK_CHATS.filter(c => c.unread).length}
                </Badge>
              </div>
              
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Поиск..."
                  className="pl-10 rounded-2xl bg-muted/50 border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="px-2 pb-4">
                {filteredChats.map((chat, index) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full p-4 rounded-2xl mb-2 text-left transition-all hover:bg-muted/50 animate-fade-in ${
                      selectedChat === chat.id ? 'bg-muted' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex gap-3">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-2xl ${THEMES.find(t => t.id === currentTheme)?.gradient} flex items-center justify-center text-2xl shadow-md`}>
                          {chat.avatar}
                        </div>
                        {chat.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                          {chat.unread && (
                            <Badge className="gradient-purple text-white border-0 ml-2">{chat.unread}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex-1 flex items-center justify-center bg-background">
            {selectedChat ? (
              <div className="text-center space-y-4 animate-fade-in">
                <div className={`w-24 h-24 rounded-3xl ${THEMES.find(t => t.id === currentTheme)?.gradient} flex items-center justify-center text-5xl mx-auto shadow-2xl`}>
                  {MOCK_CHATS.find(c => c.id === selectedChat)?.avatar}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{MOCK_CHATS.find(c => c.id === selectedChat)?.name}</h2>
                  <p className="text-muted-foreground">Начните общение</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className={`w-24 h-24 rounded-3xl ${THEMES.find(t => t.id === currentTheme)?.gradient} flex items-center justify-center mx-auto shadow-2xl animate-pulse-gradient bg-[length:200%_200%]`}>
                  <Icon name="MessageCircle" size={40} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold gradient-text">Выберите чат</h2>
                  <p className="text-muted-foreground">Начните общение с друзьями</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {activeView === 'contacts' && (
        <div className="flex-1 p-8 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-8">Контакты</h1>
          <div className="grid grid-cols-3 gap-6">
            {MOCK_CHATS.map((chat, index) => (
              <div
                key={chat.id}
                className="p-6 bg-card rounded-3xl border border-border hover:shadow-xl transition-all hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-20 h-20 rounded-3xl ${THEMES.find(t => t.id === currentTheme)?.gradient} flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg`}>
                  {chat.avatar}
                </div>
                <h3 className="font-semibold text-center mb-1">{chat.name}</h3>
                {chat.online && (
                  <p className="text-sm text-green-500 text-center flex items-center justify-center gap-1">
                    <Icon name="Radio" size={12} />
                    В сети
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'profile' && (
        <div className="flex-1 p-8 flex items-center justify-center animate-fade-in">
          <div className="max-w-md w-full space-y-6">
            <div className={`w-32 h-32 rounded-[2rem] ${THEMES.find(t => t.id === currentTheme)?.gradient} flex items-center justify-center text-6xl mx-auto shadow-2xl`}>
              🧑‍🚀
            </div>
            
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Ваш профиль</h1>
              <p className="text-muted-foreground">@miracle_user</p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-card rounded-2xl border border-border">
                <label className="text-sm text-muted-foreground">Имя</label>
                <p className="font-semibold">Юрий Космонавт</p>
              </div>
              
              <div className="p-4 bg-card rounded-2xl border border-border">
                <label className="text-sm text-muted-foreground">Статус</label>
                <p className="font-semibold">✨ Готов к приключениям</p>
              </div>
              
              <div className="p-4 bg-card rounded-2xl border border-border">
                <label className="text-sm text-muted-foreground">Телефон</label>
                <p className="font-semibold">+7 (999) 123-45-67</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'settings' && (
        <div className="flex-1 p-8 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-8">Настройки</h1>
          
          <div className="max-w-2xl space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Темы оформления</h2>
              <div className="grid grid-cols-2 gap-4">
                {THEMES.map((theme, index) => (
                  <button
                    key={theme.id}
                    onClick={() => applyTheme(theme.id)}
                    className={`p-6 rounded-3xl border-2 transition-all hover:scale-105 animate-fade-in ${
                      currentTheme === theme.id
                        ? 'border-primary shadow-xl'
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-full h-24 rounded-2xl ${theme.gradient} mb-4 shadow-lg`}></div>
                    <h3 className="font-semibold text-lg">{theme.name}</h3>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Уведомления</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border">
                  <span>Звук уведомлений</span>
                  <div className="w-12 h-6 bg-primary rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border">
                  <span>Вибрация</span>
                  <div className="w-12 h-6 bg-muted rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
