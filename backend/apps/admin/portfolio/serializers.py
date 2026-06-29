from rest_framework import serializers
from .models import PortfolioItem, PortfolioCategory, Technology, TeamRole, PortfolioMethod, TeamMember

class PortfolioItemSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', allow_blank=True, required=False)
    technologies = serializers.ListField(
        child=serializers.CharField(), required=False, write_only=True
    )
    methods = serializers.ListField(
        child=serializers.CharField(), required=False, write_only=True
    )
    team = serializers.ListField(
        child=serializers.DictField(), required=False, write_only=True
    )

    class Meta:
        model = PortfolioItem
        fields = [
            'id', 'title', 'description', 'category', 'technologies', 'client', 
            'link', 'image', 'featured', 'coverImage', 'timeTaken', 
            'startDate', 'completedDate', 'methods', 'team',
            'created_at', 'updated_at'
        ]

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['category'] = instance.category.name if instance.category else ''
        ret['technologies'] = [t.name for t in instance.technologies.all()]
        ret['methods'] = [m.name for m in instance.methods.all()]
        
        # Group team by role
        team_data = {}
        for tm in instance.team_members.all():
            role_name = tm.role.name if tm.role else 'Member'
            if role_name not in team_data:
                team_data[role_name] = []
            team_data[role_name].append(tm.name)
        
        ret['team'] = [{'role': k, 'people': v} for k, v in team_data.items()]
        return ret

    def _handle_nested(self, instance, validated_data):
        # Category
        category_name = validated_data.pop('category', None)
        if category_name is not None:
            if isinstance(category_name, dict):
                category_name = category_name.get('name', '')
            if category_name:
                cat, _ = PortfolioCategory.objects.get_or_create(name=category_name)
                instance.category = cat
            else:
                instance.category = None
            instance.save()

        # Technologies
        techs = validated_data.pop('technologies', None)
        if techs is not None:
            tech_objs = []
            for t in techs:
                obj, _ = Technology.objects.get_or_create(name=t)
                tech_objs.append(obj)
            instance.technologies.set(tech_objs)

        # Methods
        methods = validated_data.pop('methods', None)
        if methods is not None:
            instance.methods.all().delete()
            for m in methods:
                PortfolioMethod.objects.create(portfolio_item=instance, name=m)

        # Team
        team = validated_data.pop('team', None)
        if team is not None:
            instance.team_members.all().delete()
            for group in team:
                role_name = group.get('role', 'Member')
                people = group.get('people', [])
                role_obj, _ = TeamRole.objects.get_or_create(name=role_name)
                for person in people:
                    TeamMember.objects.create(portfolio_item=instance, role=role_obj, name=person)

    def create(self, validated_data):
        category_data = validated_data.pop('category', None)
        tech_data = validated_data.pop('technologies', None)
        methods_data = validated_data.pop('methods', None)
        team_data = validated_data.pop('team', None)
        
        instance = super().create(validated_data)
        
        self._handle_nested(instance, {
            'category': category_data,
            'technologies': tech_data,
            'methods': methods_data,
            'team': team_data
        })
        return instance

    def update(self, instance, validated_data):
        category_data = validated_data.pop('category', None)
        tech_data = validated_data.pop('technologies', None)
        methods_data = validated_data.pop('methods', None)
        team_data = validated_data.pop('team', None)
        
        instance = super().update(instance, validated_data)
        
        self._handle_nested(instance, {
            'category': category_data,
            'technologies': tech_data,
            'methods': methods_data,
            'team': team_data
        })
        return instance
