from django.shortcuts import render,redirect
from django.contrib.auth import login as auth_login
from django.contrib.auth.models import User
from main.models import attendance

# Create your views here.

def login(request):
    context = {
                'error': False,
                'index': False,
            }
    if request.method == 'POST':
        username = request.POST.get('username')
        try:
            if attendance.objects.filter(telegram_id = int(username)):
                try:
                    user = User.objects.get(username=username)
                except User.DoesNotExist:
                    user = User.objects.create_user(username=username)
                auth_login(request, user)
                context['index'] = True
                return redirect("index")
            else:
                context['error'] = True
        except:
            context['error'] = True
        

    return render(request, ('login/login.html'),context)