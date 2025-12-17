from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.shortcuts import redirect
from main.models import attendance

# Create your views here.


def index(request):

    context = {
        'title': 'home',
        'index': True,
        'attendance': None,
        'context': {
            'visits': 0,
            'skips':0,
            'summ':0,
        },
    }
    
    try:
        username = int(request.user.username)
        context['attendance'] = attendance.objects.filter(telegram_id = username)
        visits = 0
        skips = 0
        for i in attendance.objects.filter(telegram_id = username):
            if i.status == 'absent':
                skips +=1
            else:
                visits+=1

        summ = visits*2

        context['context']['visits'] = visits
        context['context']['skips'] = skips
        context['context']['summ'] = summ
        print(context['context'])

    except:
        context['attendance'] = None
    

    
    return render(request, 'main/index.html',context)



def logout_user(request):
    logout(request)
    return redirect('index')